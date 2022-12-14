import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import Footer from './components/Footer'
import Button from '@mui/material/Button';
import './/App.css'

const App = () => {
  let [flow, setFlow] = useState([])

const getFlow = () => {
  axios
    .get('http://localhost:8000/api/flomo')
    .then(
      (response) => setFlow(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

const handleCreate = (addDay) => {
  axios.post('http://localhost:8000/api/flomo', addDay)

    .then((response) => {
      console.log(response)
      setFlow([...flow, response.data])
    })
  }

  const handleDelete = (event) => {
    axios
      .delete('http://localhost:8000/api/flomo/' + event.target.value)
      .then((response) => {
        getFlow()
      })
  }

  const handleUpdate = (editDay) => {
    axios.put('http://localhost:8000/api/flomo/' + editDay.id, editDay)
    .then((response) => {
      setFlow(flow.map((day) => {
        return day.id !== editDay.id ? day : editDay
      }))
    })
  }


useEffect(() => {
  getFlow()
}, [])

  return(
    <>
        <header className="header">
          <div className="container title-bar">
            <h1>Flomo</h1>
            <h2>Never Miss A Period Again!</h2>
          </div>
          <div className="add-flow-box">
              <Add handleCreate={handleCreate} />
          </div>
        </header>
        <div className="page-content">
        <div className="container">
          <div className="flomo">
            {flow.map((day) => {
              return (
                <>
                <div className="cardflex">
                <div className="card" style={{width: "18rem", display: "flex"}} key={day.id}>
                  <div className="card-body">
                    <h6 className="card-title">{day.date}</h6>
                    {day.bloody ?<h5><b>Flow: </b></h5> : null}
                  {day.bloody ? <li className="list-group-item">{day.flow}</li> : null} <br/>
                  <h6 className="card-subtitle mb-2 text-muted">Symptoms</h6>
                  <ul className="list-group list-group-flush">
                  {day.cramps ?<li className="list-group-item">Cramps</li> : null}
                  {day.migraine ?<li className="list-group-item">Migraine</li> : null}
                  {day.bloating ? <li className="list-group-item">Bloating</li> : null}
                  {day.emo ? <li className="list-group-item">Emotional</li> : null}
                  {day.anger ? <li className="list-group-item">Angry</li> : null}
                  {day.food ? <li className="list-group-item">Food cravings</li> : null}
                  {day.sex ? <li className="list-group-item">Sexual craving</li> : null}
                  {day.nausea ? <li className="list-group-item">Nausea</li> : null}
                  {day.sore ? <li className="list-group-item">Tender</li> : null}
                  {day.fatigue ? <li className="list-group-item">Fatigue</li> : null}
                  {day.aches ? <li className="list-group-item">Body aches</li> : null}
                  {day.patriarchy ?<li className="list-group-item">Under the thumb of the Patriarchy</li> : null}
                  </ul>
                  </div>
                </div>
                <Edit handleUpdate={handleUpdate} day={day}/>
                <Button className="delete-btn" onClick={handleDelete} value={day.id}> Delete Flow</Button>
                </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )


}

export default App;
