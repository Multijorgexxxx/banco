/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect} from "react";
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { getCuentaUsuario } from '../api/cuenta.api';
import { getUsuarioid } from '../api/User.api';

export function Cuenta() {

    const { register, setValue } = useForm();

    const params = useParams();

    useEffect(() => {

        async function loadTasks() {
            if (params.id) {
                const res = await getUsuarioid(params.id);
                const result = await getCuentaUsuario(params.id);

                setValue('valor', result.data[0].VALOR_CUENTA);
                setValue('numero_cuenta', result.data[0].NUMERO_CUENTA);
                setValue('first_name', res.data[0].first_name + " " + res.data[0].last_name);

            }
        }
        loadTasks();

    }, [])


    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 offset-md-4">
                    <h1>Consulta</h1>
                    <div className="container">
                        <form className="card card-body text-center">
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-5">
                                    <label htmlFor="id_first_name">Titular :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text" name="first_name" className="form-control" required="" autoComplete="off" disabled
                                        maxLength="50" id="id_firts_name" {...register("first_name", { required: true })} />
                                </div>
                            </div>
                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-5">
                                    <label htmlFor="id_numero_cuenta">Numero de Cuenta :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="text" name="numero_cuenta" className="form-control" required="" autoComplete="off" disabled
                                        maxLength="50" id="id_numero_cuenta" {...register("numero_cuenta", { required: true })} />
                                </div>
                            </div>

                            <div className="row input-group mb-3">
                                <div className="form-group col-sm-5">
                                    <label htmlFor="id_valor">Valor TOTAL :</label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <input type="number" name="valor" className="form-control" required="" autoComplete="off" disabled
                                        maxLength="128" id="id_valor" {...register("valor", { required: true })} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
