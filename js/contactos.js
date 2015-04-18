//contactos
var contactos = {
    crear: function(){
        var nombre = $('#ncNom').val();
        var tel = $('#ncTel').val();
        var mail = $('#ncMail').val();
        
        var name = new ContactName();
        name.givenName = nombre;
        name.familyName = 'Practica';
        
        var phones = [];
        phones[0] = new ContactField('home',tel,true);
        phones[1] = new ContactField('work','1234567890',false);
        
        var mails = [];
        mails[0] = new ContactField('personal',mail, false);
        mails[1] = new ContactField('work','arturo.ibarra@innube.mx', true);
        
        var contacto = {
            'displayName': nombre,
            'nickname': nombre,
            'name': name,
            'phoneNumbers': phones,
            'emails': null
        };
        var miContacto = navigator.contacts.create(contacto);
        miContacto.save(contactos.guardado, contactos.error);
    },
    guardado: function(){
        navigator.notification.alert('Contacto guardado satisfactoriamente', null,'Contactos','Gracias');
    },
    error: function(err){
        navigator.notification.alert('Error: '+err.code, null,'Contactos','Gracias');
    },
    listar: function(){
        var filtro = ['*'];
        var opc = new ContactFindOptions();
        opc.filter = '';
        opc.multiple = true;
        navigator.contacts.find(filtro,contactos.lista,contactos.error,opc);        
    },
    lista: function(c){
        $('#cMostrar').html('');
        var cont = 0;
        for (i=0;i<c.length;i++){
            var nom = c[i].name.formatted;
            var tel = c[i].tel[0].value;
            cont++;
            $('cMostrar').append('<li><a href="tel:'+tel+'a>'+nom+'</li>')
        }
        if(cont==0)
            $('cMostrar').html('<li>Sin Leer Contactos</li>');
    }
};