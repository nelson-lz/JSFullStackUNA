import React, {Component} from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Compras extends Component{
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            compras:[],
            _id:'',
            cantidad:'',
            axios: this.props.axios,
            socket: this.props.socket,
            showProcessCompra:false,
            showCompras:true
        }
    }
    componentDidMount(){
        this.fetchRecursos();
    }
    async fetchRecursos(){
        await Promise.all([this.fetchProductos(), this.fetchCompras()]);
    }
    
    async fetchProductos(){
        try {
            await this.state.socket.emit('fetchProductos');
            await this.state.socket.on('Productos', (data) => {
                this.setState({
                    productos:data
                })
            });
        } catch (error) {
            NotificationManager.error('No se pudo recuperar los productos', 'Error');
        }
    }
    async fetchCompras(){
        try {
            await this.state.socket.emit('fetchCompras');
            await this.state.socket.on('Compras', (data) => {
                this.setState({
                    compras:data
                })
            });
        } catch (error) {
            NotificationManager.error('No se pudo recuperar los productos', 'Error');
        }
    }
    processCompra(id){
        this.setState({
            showProcessCompra:true,
            _id:id,
            showCompras:false
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const compra = {
            cantidad:this.state.cantidad,
            producto:this.state._id
        }
        try {
            const res = await this.state.axios.post('/api/compras',compra);
            if(res.data.success){
                NotificationManager.success(res.data.message,'Compras');
                this.setState({
                    showCompras:true,
                    showProcessCompra:false,
                    _id:''
                })
                this.fetchRecursos();
            }else {
                NotificationManager.error(res.data.message,'Compras');
            }
        } catch (error) {
            console.log('error');
        }
        console.log(this.state.cantidad);
    }
    render(){
        const {showProcessCompra, showCompras} = this.state;

        const processCompra = (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Confirmar compra</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-sm-10">
                                <label htmlFor="cantidad">Cantidad del Producto</label>
                                <input type="number" name="cantidad" id="cantidad" 
                                    placeholder="Ingrese la cantidad del producto" autoComplete="off"
                                    className="form-control form-control-sm" onChange={this.handleChange} required/>
                                
                            </div>
                            <div className="form-group col-sm10">
                                <button className="btn btn-primary btn-sm">Comprar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
        const dashboar = (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Dashboard compras</h5>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Monto Total</th>
                                <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.compras.map(compra => {
                                    return (
                                        <tr key={compra._id}>
                                            <td>{compra.producto.nombre}</td>
                                            <td>{compra.producto.precio}</td>
                                            <td>{compra.cantidad}</td>
                                            <td>{compra.monto}</td>
                                            <td>{compra.fecha}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-5">
                        {
                            this.state.productos.map(producto => {
                                return (
                                    <div className="card" key={producto._id} style={{marginTop:'4px'}}> 
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">{producto.precio} Gs.</p>
                                            {producto.stock > 0 ? <p className="card-text">Disponible</p>
                                                                : <p className="card-text">Agotado</p>}
                                            <button className="btn btn-primary btn-sm">
                                                <i className="material-icons" onClick={()=> this.processCompra(producto._id)}>shopping_cart</i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-sm-7">
                        { showProcessCompra && processCompra}
                        { showCompras && dashboar}
                    </div>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}