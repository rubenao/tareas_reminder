function getStartOfDayUnix() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return Math.floor(startOfDay / 1000); // Convertir a formato Unix (segundos desde 1970)
  }

  function getEndOfDayUnix() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - 1;
    return Math.floor(endOfDay / 1000); // Convertir a formato Unix
  }



export async function load(){
  

    const res = await fetch('https://xksj-cccl-hafb.n7d.xano.io/api:5iYddh82/tareas_reminder', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - 1;

    console.log(startOfDay)
    console.log(endOfDay)

    const res_time = await fetch('https://xksj-cccl-hafb.n7d.xano.io/api:5iYddh82/get_start_end_day', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({start:startOfDay, end:endOfDay})
      });
    
 
  
    const todos = await res.json()
    console.log(todos.result1)

    const tasksToday = todos.result1.filter(task => task.reminder > startOfDay && task.reminder < endOfDay);
    console.log(tasksToday)
 

    return {
    todos, tasksToday
    }
}

const convertToUnix = (dateString) => {
    const date = new Date(dateString);
    return Math.floor(date.getTime());

    //return date.getTimezoneOffset()
  };

export const actions = {


    crear: async ({request})=> {



        const formData = await request.formData()
        const nombre_tarea = formData.get('nombre_tarea')
        const reminder = formData.get('reminder')

        const unixTimestamp = convertToUnix(reminder);
        console.log(unixTimestamp)

        const api_crear_tarea = await fetch('https://xksj-cccl-hafb.n7d.xano.io/api:5iYddh82/tareas_reminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre_tarea, reminder})
        });


        if(api_crear_tarea.ok){
            const response = await api_crear_tarea.json()
            console.log(response)
            return response

        } else {

            console.log(api_textos)

            redirect(303, '/')

        }


    }

        


    }
