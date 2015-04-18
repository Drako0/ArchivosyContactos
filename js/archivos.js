//archivos
var archivos = {
    escribir: function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, archivos.accesoAlSistema, archivos.error);
    },
    accesoAlSistema: function(sa){//Recibe el sistema de archivos
        sa.root.getFile('practica.txt', {create: true, exclusive: false}, archivos.accesoArchivo, Archivos.error);
    },
    accesoArchivo: function(){//Recibe la entrada del archivo
        ea.crateWriter(archivos.escritor, archivos.error);
    },
    escritor: function(e){//obtenemos el escritor como objeto
        var cont = $('#aSend').val();
        e.write(cont);
        e.onwriteend = function(evt){
            navigator.notification.alert('El archivo fue creado satisfactoriamente', null, 'Archivos', 'Aceptar');
        }
    },
    error: function(err){
        navigator.notification.alert('Error: '+err.code,null,'Archivos', '¿Ya qué?');
    },
    leer: function(sa){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, archivos.accesoSistema, archivos.error);
        sa.root.getFile('practica.txt', null, archivos.accesoFile, archivos.error);
    },
    accesoFile: function(ea){
        ea.file(archivos.lector, archivos.error);    
    },
    lector: function(a){
        var lector = new FileReader();
        lector.readAsText(a);
        lector.onloadend = function(evt){
            $('#aGet').text(evt.target.result);
        }
        
    }
};