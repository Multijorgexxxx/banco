/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCuenta, putCuenta } from '../api/cuenta.api';
import { getUsuarioid } from '../api/User.api';

export function Consigna() {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const navigate = useNavigate();


    const onSubmit = handleSubmit(async dat => {

        var n = dat.numero_cuenta;
        const res = await getCuenta(n);

        if (res.data.lent != 0) {
            let id_usuario = res.data[0].USUARIO;

            const result = await getUsuarioid(id_usuario);
            if (result.data.lent != 0) {

                let valor_total = parseInt(res.data[0].VALOR_CUENTA) + parseInt(dat.valor);

                var obj = {
                    "VALOR_CUENTA": valor_total,
                    "NUMERO_CUENTA": res.data[0].NUMERO_CUENTA,
                    "USUARIO": id_usuario
                }

                const c = await putCuenta(res.data[0].ID, obj);
                navigate(`/saldo/${id_usuario}`);
            }
        }
    })


    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 offset-md-4">
                    <h1>Realizar Consignacion</h1>
                    <div className="container">
                        {errors.valor &&
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <svg className="bi flex-shrink-0 me-2" role="img" width="20" height="20" aria-label="Danger:">
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div>
                                    Error en la consignacion por favor validar.
                                </div>
                            </div>
                        }
                        <form onSubmit={onSubmit} className="card card-body text-center">
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-5">
                                    <label htmlFor="id_numero_cuenta">Numero de Cuenta :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text" name="numero_cuenta" className="form-control" required="" autoComplete="off"
                                        maxLength="50" id="id_numero_cuenta" {...register("numero_cuenta", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-5">
                                    <label htmlFor="id_valor">Valor a Consignar :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="number" name="valor" className="form-control" required="" autoComplete="off"
                                        maxLength="128" id="id_valor" {...register("valor", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-6">
                                    <button className="btn btn-success">Consignar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
