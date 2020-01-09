import {Router, Request, Response} from 'express'
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/clientes', (req:Request, res: Response) =>{

    const query =`SELECT * FROM clientes`;
    
    

    MySQL.ejecutarQuery( query, (err:any, clientes: Object[] )=>{

        if(err){
            res.status(400).json({
                ok:false,
                error: err
            });
        }

        else{
            res.json({
                ok:true,
                clientes
            });
        }

    } );

   

});

router.get('/clientes/:id', (req:Request, res: Response) =>{

    const id= MySQL.escapearDatos(req.params.id) ;

    

    //Tenemos que "escapado" par aque no tenga caracteres que no necesitamos como --
    //Para evitar posibles inyecciones sql

    // escapeId
    

    const query =`SELECT * FROM clientes WHERE id=${id}`;

    MySQL.ejecutarQuery( query, (err:any, heroe: Object[] )=>{

        if(err){
            res.status(400).json({
                ok:false,
                error: err
            });
        }

        else{
            res.json({
                ok:true,
                heroe: heroe[0]
            });
        }

    } );

});

export default router;