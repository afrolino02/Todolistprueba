function initApp(){
    // Variables 
    const formulario = document.getElementById('formulario');
    const eliminarBoton = document.querySelector('.eliminar');
    const editarBoton = document.querySelector('.editar');
    let tareas = [];
 
    // llamar listeners
    document.addEventListener('DOMContentLoaded', listeners)
    
    listeners();
    // Listeners
    function listeners(){
        formulario.addEventListener('submit', agregarTarea);
        tareas = JSON.parse(localStorage.getItem('tareas'));
                sincronizarLocalStorage();
                mostrarHistorialDeTareas();
                
       
    }

    function agregarTarea(e){
    
        e.preventDefault();
        const tareaEscrita = document.querySelector('#tarea').value;
        const tareasEspacio = document.querySelector('.div-2');
        if(tareaEscrita === ''){
            mostrarAviso('El campo esta vacio', 'error')
        } else{
            mostrarAviso('Tarea agregada correctamente')
            const tareaNueva = document.createElement('DIV');
            tareaNueva.classList.add('tareas');
            tareaNueva.innerHTML += ` 
            <li> ${tareaEscrita} <span class="eliminar"> eliminar</span><span class="editar"> editar</span></li>
            `;
    
            //  Desplegar nueva tarea
    
            tareasEspacio.appendChild(tareaNueva);
            const tareasObj = {
                id: Date.now(),
                tareaEscrita:tareaEscrita
            };
            
            tareas = [...tareas, tareasObj];
    
            console.log(tareas)
            // console.log(tareas)
            formulario.reset();
            eliminar(tareaNueva, tareasObj.id);
            editar(tareaNueva,tareasObj);

            // Restablecer almacenamiento persistente
       
        }  
        
        
    }
    function eliminar(e, id){
        const eliminarTexto = e.querySelector('.eliminar');
        eliminarTexto.onclick = () => {
            eliminarTexto.parentNode.parentNode.remove(); 
                tareas = tareas.filter( tarea => tarea.id !== id);
                console.log(tareas)
                sincronizarLocalStorage();
        };   
        
    }

    function editar(e ,tareaObj){
        const { tareaEscrita, id } = tareaObj;
        const editarBoton = e.querySelector('.editar');
        editarBoton.onclick = function(){
            const tareasInput = document.querySelector('#tarea');
            tareasInput.value = tareaEscrita;
            
            formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
            formulario.querySelector('button[type="submit"]').onclick = () => {
                editarBoton.parentNode.parentNode.remove(); 
                tareas = tareas.filter( tarea => tarea.id !== id);
                sincronizarLocalStorage();
            };
        };
        
    }

    function mostrarAviso(mensaje, tipo){
        // Alerta Negativa
       if( tipo === 'error'){
        const divMensaje = document.createElement('DIV');
        divMensaje.textContent = mensaje;
        divMensaje.classList.add('alert', 'alert-danger','text-center','uppercase', 'mx-5','my-5', 'fs-2');

        formulario.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove(); 
        }, 3000);

       } else{
        // alerta negativa
        const divMensaje = document.createElement('DIV');
        divMensaje.textContent = mensaje;
        divMensaje.classList.add('alert', 'alert-success','text-center','uppercase', 'mx-5','my-5', 'fs-2');

        formulario.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove(); 
        }, 3000);
       }
            
        
    }

    function sincronizarLocalStorage(){
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }

    function mostrarHistorialDeTareas(){
        const tareasEspacio = document.querySelector('.div-2');
        tareas.forEach( tarea => {
            const tareaNueva = document.createElement('DIV');
        tareaNueva.classList.add('tareas');
        tareaNueva.innerHTML += ` 
        <li> ${tarea.tareaEscrita} <span class="eliminar"> eliminar</span><span class="editar"> editar</span></li>
        `;
        tareasEspacio.appendChild(tareaNueva);
        eliminar(tareaNueva, tarea.id)
        editar(tareaNueva,tarea);
        
        })
        
    }

}
document.addEventListener('DOMContentLoaded', initApp)

