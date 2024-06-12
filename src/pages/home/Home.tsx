import React, {useState, useEffect} from 'react';
import { useAuth } from '../../components/context/Auth/AuthProvider'
import requestData from '../../helpers/request';

const Home = () => {
    const auth = useAuth();
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    },[])

    function getTodos() {
        requestData({
            endpoint: '/todo/index'
        }).then(res => setTodos(res.todos))
    }

    function updateTodo(e: React.FocusEvent<HTMLInputElement>, todo) {
        const description = e.target.value;

        if (description == todo?.description) return;

        requestData({
            endpoint: `/todo/update/${todo?.id}`,
            method: 'put',
            data: {
                description
            }
        })
    }

    function completeTodo(todo){
        requestData({
            endpoint: `/todo/update/${todo?.id}`,
            method: 'put',
            data: {
                description: todo?.description,
                completed: true,
            }
        }).then(res => {
            if(res.status){
                getTodos();
            }
        })
    }

    function onDeleteTodo(todo){
        const confirmation = confirm(`Do you want to delete ${todo?.description}`);

        if (confirmation) {
            requestData({
                endpoint: `/todo/delete/${todo?.id}`,
                method: 'delete',
            }).then(res => {
                if (res.status) {
                    getTodos();
                }
            })
        }
    }
    
  return (
    <div>
        <nav>
            <button onClick={auth.logout}>Logout</button>
        </nav>
          <h1>Home</h1>

        <div className='w-[400px]'>
              <h2 className='mt-5 text-2xl'>Todos</h2>
              <ul className='mt-5'>
                  {
                      todos?.map(todo => {
                          if (todo?.completed) {
                              return <li key={todo?.id} className='flex justify-between my-1'>
                                  <input
                                      type="text"
                                      defaultValue={todo?.description}
                                      onBlur={(e) => updateTodo(e, todo)}
                                  />
                                  <button onClick={() => completeTodo(todo)} className='bg-green-400 text-white rounded px-1' >Complete</button>
                              </li>
                          }
                      })
                  }
              </ul>

              <h2 className='mt-5 text-2xl'>Completados</h2>
              <ul className='mt-5'>
                  {
                      todos?.map(todo => {

                          if (todo?.status && todo?.completed) {

                              return <li key={todo?.id} className='flex justify-between my-1'>
                                  <p>{todo?.description}</p>
                                  <button onClick={() => onDeleteTodo(todo)} className='bg-red-400 text-white rounded px-1' >Delete</button>
                              </li>
                          }
                      })
                  }
              </ul>
        </div>
          
    </div>
  )
}

export default Home