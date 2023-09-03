const today = new Date()
function formatDate(date:Date){
    return Intl.DateTimeFormat(
        'en-US',
        {weekday: 'long'},
    ).format(date)
}
export default function ToDoList(props:any){
    console.log(props)
    return (
      <div className="card">
        <h1>To Do List</h1>
        <img 
            src="https://i.imgur.com/yXOvdOSs.jpg" 
            alt="Hedy Lamarr" 
            className="photo"
        />
        <ul>
            <li>ToDO 1 {formatDate(today)}</li>
            <li>ToDO 2 {formatDate(today)}</li>
            <li>ToDo 3 {formatDate(today)}</li>
        </ul>
      </div>  
    )
}