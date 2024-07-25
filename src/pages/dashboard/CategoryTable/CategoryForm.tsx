import { useEffect } from 'react'
import Form from '../../../components/Form/Form';
import { FormInput } from '../../../components/Form/FormInput';
import { useForm } from 'react-hook-form';
import { Category } from '../../../interfaces/models';

interface Props {
    onSubmit: (data:Category)=> void;
    data?: Category;
}

const CategoryForm = ({ onSubmit, data }: Props) => {
    const { register, handleSubmit, formState, setValue } = useForm();

    const formFields = {
        id: register('id', {
            required: {
                value: data?.id ? true : false,
                message: 'Field required'
            }
        }),
        name: register('name', {
            required: {
                value: true,
                message: 'Field required'
            }
        }),
        description: register('description', {
            required: {
                value: false,
                message: 'Field required'
            }
        }),
    }

    useEffect(() => {
        setValue('id', data?.id)
    }, [data])
    

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <>
                    <FormInput
                        name='name'
                        label='Name'
                        type='text'
                        defaultValue={data?.name}
                        register={formFields.name}
                        formState={formState}
                    />

                    <FormInput
                        name='description'
                        label='Description'
                        type='text'
                        defaultValue={data?.description}
                        register={formFields.description}
                        formState={formState}
                    />
                </>
            </Form>
        </div>
    )
}

export default CategoryForm;