/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postCuenta } from '../api/cuenta.api';
import { postUser } from '../api/User.api';


export function UserCrearte() {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async dat => {

        var today = new Date();

        var now = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay() + " " + today.getHours() + ":"
            + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();

        var numero_cuenta = today.getFullYear() + "" + today.getMonth() + "" + today.getDay() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds() + "" + today.getMilliseconds();

        var us = {
            "first_name": dat.first_name,
            "last_name": dat.last_name,
            "email": dat.email,
            "username": dat.username,
            "password": dat.password
        }

        const res = await postUser(us);

        if (res.lent != 0) {
            let id_usuario = res.data.id;
            var c = {
                "NUMERO_CUENTA": numero_cuenta,
                "VALOR_CUENTA": dat.valor,
                "FECHA_CREACION": now,
                "ESTADO": "ACTIVO",
                "USUARIO": id_usuario
            }
            const rest = await postCuenta(c);
            navigate(`/saldo/${id_usuario}`);
        }
    })


    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 offset-md-4">
                    <h1>Crear Cuenta</h1>
                    <div className="container">
                        <form onSubmit={onSubmit} method="post" className="card card-body text-center">
                            {errors.username &&
                                <div className="alert alert-danger" role="alert">
                                    <svg className="bi flex-shrink-0 sm-2" role="img" width="20" height="20" aria-label="Danger:">
                                        <use xlinkHref="#exclamation-triangle-fill" />
                                    </svg>
                                    Por favor validar los campos digitados
                                </div>
                            }
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="id_first_name">Nombre :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text" name="first_name" className="form-control" required="" autoComplete="off" maxLength="150" id="id_first_name"
                                        {...register("first_name", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="id_last_name">Apellido :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text" name="last_name" className="form-control" required="" autoComplete="off" maxLength="150" id="id_last_name"
                                        {...register("last_name", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="id_email">Correo Electronico :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="email" name="email" className="form-control" required="" autoComplete="off" aria-describedby="basic-addon2" aria-label="Recipient's username" maxLength="254" id="id_email"
                                        {...register("email", { required: true })} />
                                    <span className="input-group-text" id="basic-addon2">@example.com</span>
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="id_valor">Valor Inicial:</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="number" name="valor" className="form-control" required="" autoComplete="off" aria-describedby="basic-addon2" aria-label="Recipient's username" maxLength="11" id="id_valor"
                                        {...register("valor", { required: true })} />
                                    <span className="input-group-text" id="basic-addon2">000000$</span>
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="id_username">Cedula :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text" name="username" className="form-control" required="" autoComplete="off" maxLength="150" id="id_username"
                                        {...register("username", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-4">
                                    <label htmlFor="id_password">Contraseña :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="password" name="password1" className="form-control" required="" autoComplete="off"
                                        maxLength="128" id="id_password"
                                        {...register("password", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="col-sm-4">
                                    <label htmlFor="id_password">Confirme Contraseña :</label>
                                </div>
                                <div className="col-sm-6">
                                    <input type="password" name="password2" className="form-control" required="" autoComplete="off"
                                        maxLength="128" id="id_password" />
                                </div>
                            </div>
                            <button className="btn btn-success">Crear Cuenta</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
