import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Productos extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            precio:'',
            stock:'',
            _id:'',
            editing:false,
            axios:this.props.axios,
            socket:this.props.socket,
            productos:[]
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount(){
        this.fetchProductos();
    }
    async fetchProductos(){
        try {
          await this.state.socket.emit('fetchProductos');  
          await this.state.socket.on('Productos', (data) => {
            this.setState({
                productos:data
            });
          });
        } catch (error) {
            NotificationManager.error('No se pudo recuperar los datos', 'Error');
        }
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        const producto = {
            nombre:this.state.nombre,
            precio:this.state.precio,
            stock:this.state.stock
        }
        try {
            if(this.state.editing){
                const res = await this.state.axios.put('/api/productos/'+this.state._id, producto);
                if(res.data.success){
                    NotificationManager.success(res.data.message,'Producto');
                    this.setState({
                        nombre:'',
                        precio:'',
                        stock:'',
                        _id:'',
                        editing:false
                    });
                    this.fetchProductos();
                    document.getElementById('form').reset();
                }else{
                    NotificationManager.error(res.data.message, 'Producto');
                }
            }else{
                const res = await this.state.axios.post('/api/productos', producto);
                if(res.data.success){
                    NotificationManager.success(res.data.message,'Producto');
                    this.setState({
                        nombre:'',
                        precio:'',
                        stock:''
                    });
                    this.fetchProductos();
                    document.getElementById('form').reset();
                }else{
                    NotificationManager.error(res.data.message, 'Producto');
                }
            }
        } catch (error) {
            NotificationManager.error('Ha ocurrido un error!','Error!')
        }
    }

    async editProducto(id){
        try {
            const res = await this.state.axios.get('/api/productos/'+id);
            this.setState({
                nombre:res.data.nombre,
                precio:res.data.precio,
                stock:res.data.stock,
                editing:true,
                _id:res.data._id
            });
        } catch (error) {
            console.log('error');
        }
    }
    async deleteProducto(id){
        try {
            const res = await this.state.axios.delete('/api/productos/'+id);
            if(res.data.success){
                NotificationManager.success(res.data.message, 'Producto');
                this.fetchProductos();
            }
        } catch (error) {
            console.log('error');
        }
    }

    render(){
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Formulario de productos</h5>
                                <form id="form" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-sm-11">
                                            <label htmlFor="nombre">Nombre del producto</label>
                                            <input type="text" name="nombre" id="nombre" placeholder="nombre del producto" 
                                                className="form-control form-control-sm " autoComplete="off" 
                                                required onChange={this.handleChange} value={this.state.nombre}/>
                                        </div>
                                        <div className="form-group col-sm-11">
                                            <label htmlFor="precio">Precio del producto</label>
                                            <input type="number" name="precio" id="precio" placeholder="precio del producto"
                                                className="form-control form-control-sm " autoComplete="off" 
                                                required onChange={this.handleChange} value={this.state.precio}/>
                                        </div>
                                        <div className="form-group col-sm-11">
                                            <label htmlFor="precio">Stock del producto</label>
                                            <input type="number" name="stock" id="stock" placeholder="stock del producto"
                                                className="form-control form-control-sm " autoComplete="off" 
                                                required onChange={this.handleChange} value={this.state.stock}/>
                                        </div>
                                        <div className="form-group col-sm-11">
                                            <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Dashboard</h5>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.productos.map(producto => {
                                                return(
                                                    <tr key={producto._id}>
                                                        <td>{producto.nombre}</td>
                                                        <td>{producto.precio}</td>
                                                        <td>{producto.stock}</td>
                                                        <td>
                                                            <button className="btn btn-primary btn-sm" 
                                                              onClick={() => this.editProducto(producto._id)}>
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button className="btn btn-danger btn-sm" style={{margin:'4px'}}
                                                              onClick={() => this.deleteProducto(producto._id)}>
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}