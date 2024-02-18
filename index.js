import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import OpenAI from 'openai'
const openai = new OpenAI(process.env.OPENAI_API_KEY)

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080

app.post('/', async (req, res) => {
  const { message } = req.body
  console.log(message)

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Who won the world series in 2020?' },
        {
          role: 'assistant',
          content: 'The Los Angeles Dodgers won the World Series in 2020.',
        },
        { role: 'user', content: 'Where was it played?' },
      ],
      model: 'gpt-3.5-turbo',
    })
    console.log('Response from OpenAI:', completion.choices[0].messages)

    if (completion.choices && completion.choices.length > 0) {
      const responseText = completion.choices[0].text
      console.log('Response from OpenAI:', responseText)
      res.json({ message: responseText })
    } else {
      console.error('Invalid response from OpenAI:', completion)
      res.status(500).json({ error: 'Invalid response from OpenAI API.' })
    }
  } catch (error) {
    console.error('Error processing request:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request.' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
