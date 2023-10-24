function initApp(){
    // Variables 
    const formulario = document.getElementById('formulario');
    const eliminarTexto = document.querySelector('.eliminar');
    let tareas = [];
    

    
    // llamar listeners
    document.addEventListener('DOMContentLoaded', listeners)
    
    listeners();
    // Listeners
    function listeners(){
        formulario.addEventListener('submit', agregarTarea);
        

    }

    function agregarTarea(e){

        
        e.preventDefault();
        //  Seleccinar area de tareas
        const tareaEscrita = document.querySelector('#tarea').value;
        //  seleccinar 
        const tareasEspacio = document.querySelector('.div-2');
        
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
        const eliminarTexto = tareaNueva.querySelector('.eliminar');
        eliminarTexto.addEventListener('click', function(){
                eliminarTexto.parentNode.parentNode.remove()
        })
        tareas = [...tareas, tareasObj];

        // console.log(tareas)
        formulario.reset();
        eliminar()
        
    }
    function eliminar(){
         

        
    }

}
document.addEventListener('DOMContentLoaded', initApp)

