import mysql= require('mysql');

//Clase con una sola instancia 
//singleton

export default class MySQL{

    private static _instance: MySQL;

    coneccion: mysql.Connection;

    conectado:boolean=false;

    constructor(){

        console.log('Clase inicializada de mysql');

        this.coneccion= mysql.createConnection({
            host: 'localhost',
            user: 'user_node',
            password: 'Mitolonga06',
            database: 'base_node',
            port : 3306
        });

        this.conectarBD();

    }

    //De esta forma si la la propiedad ya fue instanciada la retorna
    //y si no la crea
    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    public static ejecutarQuery( query:string, callback:Function){

        this.instance.coneccion.query( query, (err, results:Object[], fields )=>{

            if(err){
                console.log('Error en query',err);
                return callback( err );
            }
            
            if( results.length === 0){
                callback('El registro solicitado no existe')
            }
            else{
                callback(null, results);
            }

        } );

    }

    public static escapearDatos( data:any ){
        return this.instance.coneccion.escape(data);
    }


    private conectarBD(){

        this.coneccion.connect( (err: mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return;
            }

            this.conectado= true;
            console.log('Base de datos sql online');

        });
    }


}

