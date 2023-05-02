import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCuentaUsuario } from '../api/cuenta.api';
import { getUsuario } from '../api/User.api';


export function UserLoginForm() {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async dat => {

        const res = await getUsuario(dat.username);

        let id_usuario = res.data[0].id;

        const result = await getCuentaUsuario(id_usuario);
        if(result){
    
            navigate(`/saldo/${id_usuario}`);
        }
    })


    return <main className="container">
        <div className="row">
            <div className="col-md-6 offset-md-4">
                <h1>Iniciar Sesion</h1>
                <div className="container">
                    {errors.username &&
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <svg className="bi flex-shrink-0 me-2" role="img" width="20" height="20" aria-label="Danger:">
                                <use xlinkHref="#exclamation-triangle-fill" />
                            </svg>
                            <div>
                                Error al iniciar sesion.
                            </div>
                        </div>
                    }
                    <form onSubmit={onSubmit} className="card card-body text-center">
                        <div className="row input-group mb-3">
                            <div className="form-group col-sm-4">
                                <label htmlFor="id_username">Numero Cedula :</label>
                            </div>
                            <div className="form-group col-sm-6">
                                <input type="text" name="username" className="form-control" required="" autoComplete="off"
                                    maxLength="50" id="id_username" {...register("username", { required: true })} />
                            </div>
                        </div>
                        <div className="row input-group mb-3">
                            <div className="form-group col-sm-4">
                                <label htmlFor="id_password">Contraseña :</label>
                            </div>
                            <div className="form-group col-sm-6">
                                <input type="password" name="password" className="form-control" required="" autoComplete="off"
                                    maxLength="128" id="id_password" {...register("password", { required: true })} />
                            </div>
                        </div>
                        <div className="row input-group mb-3">
                            <div className="form-group col-sm-6">
                                <button className="btn btn-success">Inciar Sesion</button>
                            </div>
                            <div className="form-group col-sm-6">
                                <a className="btn btn-primary" href="/crear_cuenta/">Crear Cuenta</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>;

}
