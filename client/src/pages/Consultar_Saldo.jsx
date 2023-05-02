/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCuenta } from '../api/cuenta.api';
import { getUsuarioid } from '../api/User.api';

export function Consultar_Saldo() {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async dat => {

        var n = dat.numero_cuenta;
        const res = await getCuenta(n);

        if (res.data.lent != 0) {
            let id_usuario = res.data[0].USUARIO;

            const result = await getUsuarioid(id_usuario);
            if (result.data.lent != 0) {
                navigate(`/saldo/${id_usuario}`);
            }
        }
    })


    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 offset-md-4">
                    <h1>Consulta</h1>
                    <div className="container">
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
                                <div className="form-group col-sm-6">
                                    <button className="btn btn-success">Consultar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
