import React, {useState, useEffect} from 'react';
import { useAuth } from '../../components/context/Auth/AuthProvider'
import requestData from '../../helpers/request';
import Form from '../../components/Form/Form';
import { FormInput } from '../../components/Form/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
    description: string;
}

const Home = () => {
    const auth = useAuth();
    const [todos, setTodos] = useState([]);
    const { register, formState, handleSubmit, reset } = useForm<FormValues>({
        resetOptions:{
            keepDirtyValues: false
        }
    });

    const formFields = {
        description: register('description', {
            required: {
                value: true,
                message: 'Field required'
            },
            minLength: {
                value: 3,
                message: 'A todo should be at least 3 characters.'
            }
        })
    }

    useEffect(() => {
        getTodos()
    },[])

    useEffect(() => {
      
        window.addEventListener('keyup', (e) => {
            
            if (e.key == "Enter") {
                let $input = document.activeElement as HTMLElement;
                
                $input.blur()
            }
        })
    
      return () => {
        
      }
    }, [])
    

    function getTodos() {
        requestData({
            endpoint: '/todo/index'
        }).then(res => setTodos(res.todos))
    }

    function addTodo(data:FormValues): SubmitHandler<FormValues>{

        const { description } = data;

        if (description.length < 3 ) return;

        requestData({
            endpoint: '/todo/create',
            method: "post",
            data:{
                description
            }
        }).then( res => {
            reset()
            getTodos();
        }).catch(err => {
            console.error(err)
        })
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
        }).then( res => console.log)
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
        <nav className='flex justify-center py-2 bg-slate-800'>
            <button onClick={auth.logout} className='p-1 rounded'>Logout</button>
        </nav>

        <article className='border border-gray-400 my-5 p-2 w-[400px] mx-4 rounded-md'>
            <Form onSubmit={handleSubmit(addTodo)} >
                <FormInput
                    name='description'
                    label='Description'
                    type='text'
                    register={formFields.description}
                    formState={formState}
                />
            </Form>
        </article>

        <div className='w-[400px] px-4'>
              <h2 className='mt-5 text-2xl'>Todos</h2>
              <ul className='mt-5'>
                  {
                      todos?.map(todo => {
                          if (todo?.status && !todo?.completed) {
                              return <li key={todo?.id} className='flex justify-between my-2'>
                                  <input
                                      type="text"
                                      defaultValue={todo?.description}
                                      onBlur={(e) => updateTodo(e, todo)}
                                      className='outline outline-gray-300 rounded-sm p-1'
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
                                  <p className='line-through text-gray-400'>{todo?.description}</p>
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