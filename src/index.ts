import Server from './server/server'
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init( 3000 );

//Asi usamos las rutas que tenga el router
server.app.use( router);

//De esta forma utilizamos el singleton para crear sola una instancia en
//toda la aplicacion
//MySQL.getInstance();


server.start( ()=>{

    console.log('Escuchando el pueto 3000');
} );