import express = require('express');

import path= require('path');

export default class Server{

    public app: express.Application;
    public port: number;

    constructor( puerto: number){
        this.port= puerto;    
        this.app= express();
    }

    //Para inicializar express en una sola instancia en la aplicacion
    //Patron de diseño SingleTon
    //Al llamar este metodo inicia el servidor
    static init (puerto:number){

        return new Server(puerto);
    }

    start(callback: Function){

        this.app.listen( this.port, callback() );
        this.publicFolder();
    }

    //De esta forma compartimos para TODO mundo la carpeta estatica public
    private publicFolder(){

        const publicPath= path.resolve(__dirname, '../public');

        this.app.use( express.static(publicPath) );
    }


}