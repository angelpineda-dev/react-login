import axios from 'axios';
import toast from 'react-hot-toast';

export const AxiosInterceptor = () => {
    axios.interceptors.request.use((request) => {

        return request;
    });

    axios.interceptors.response.use(function (response) {

        return response
    }, function (error) {

        if(error?.response?.data?.status == false){

            if (error?.response?.data?.message){
                toast.error(error?.response?.data?.message, {duration: 3000})
            }else{
                let errors = error?.response?.data?.error

                errors.forEach((err) => {
                    toast.error(err, {
                        duration: 3000
                    })
                });
            }

            return error;
        }

        return error;

    })
}