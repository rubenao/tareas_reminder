<script>
    import { onMount } from 'svelte';
  
    let currentDate = new Date();
    export let data
    $: todos = data.todos.result1
    $: tasks_today = data.tasksToday
    console.log(todos)

    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - 1;

    const dia_unix = Math.floor(now.getTime())

    // Variables reactivas
  let selectedDate = '';      // Fecha seleccionada en formato de fecha
  let unixTimestamp = '';     // Timestamp Unix correspondiente

  // Función para actualizar el Unix timestamp cuando se cambia la fecha
  function updateUnixTimestamp() {
    if (selectedDate) {
      const date = new Date(selectedDate);
      unixTimestamp = Math.floor(date.getTime()); // Convertir a Unix timestamp
    } else {
      unixTimestamp = ''; // Limpiar si no hay fecha
    }
  }
  
    // Simulated todo data (replace this with actual data fetching logic)

  </script>
  
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Tareas Reminders</h1>
    
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">
         {currentDate.toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </h2>
      
      <h3 class="text-xl font-semibold mb-4">Tareas pendientes:</h3>

      
      {#if todos.length === 0}
        <p class="text-gray-500">No hay tareas, crea una!</p>
      {:else}
        <ul class="space-y-2">
          {#each tasks_today as todo}
            <li class="flex items-center space-x-2">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>
                {todo.id} - {todo.nombre_tarea}
              </span>
              <span class="text-sm text-gray-500">
                ({new Date(todo.reminder).toLocaleString('es-PE', { month: 'long', day: 'numeric' , hour: '2-digit',minute: '2-digit'} )})

                {todo.reminder}
              </span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  
    <div class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">Agregar tarea</h3>
      Inicio del día:{startOfDay}
      ahora: {now}
      Fin del día: {endOfDay}

      dia unix: {dia_unix}
      <form method="POST" action="?/crear" class="space-y-4">
        <div>
          <label for="todoName" class="block text-sm font-medium text-gray-700">Nombre de la tarea</label>
          <input
            type="text"
            id="todoName"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="nombre_tarea"
          />
        </div>
        <div>
          <label for="todoReminder" class="block text-sm font-medium text-gray-700">Recordatorio</label>
          <input
            type="datetime-local"
            id="todoReminder"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            name="reminder"
            bind:value={selectedDate}
            on:input={updateUnixTimestamp}
          />
        </div>

                    <!-- Input que muestra el valor en formato Unix -->
            <label for="unix">Fecha en formato Unix:</label>
            <input
                type="text"
                id="unix"
                value={unixTimestamp}
                readonly
            />
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar tarea
        </button>
      </form>
    </div>
  </main>
