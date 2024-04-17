import { useState } from 'react'

function InputCreate () {
  const [title, setTitle] = useState('')
  const [err, setErr] = useState(null)
  const [res, setRes] = useState('')
  const payload = { title }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setRes('')
    const urlApiCreate = import.meta.env.VITE_APP_API_URL+'create'
    try {
      const response = await fetch(urlApiCreate, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
      })
      if(response.ok) {
        const data = await response.json()
        setRes(data.title)
        setTitle('')
      } 
    } catch (error) {
      setErr(error)
      console.log(`Este es el error ${err}`)
    }
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='escribe la tarea'
        required 
      />
    <button type='submit'>Añadir</button>
    </form>
    <h2>Se ha enviado la tarea: {res}</h2>
    </>
  )

} 

export default InputCreate