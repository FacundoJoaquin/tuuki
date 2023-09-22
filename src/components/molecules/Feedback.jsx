const Feedback = () => {
  return (
    <>
      <p>
        ¡Muchas gracias por haber entrado a mi aplicación! Valoraría mucho si me
        dejas un comentario de feedback para poder mejorar mi aplicación y
        también, mejorar yo como programador.
      </p>
      <div className="flex flex-col items-center gap-y-1 mt-2">
      <input type="text" className="border rounded-md border-gray-500"/>
      <button className="bg-red-500 w-16 p-1 text-white rounded-lg">Enviar</button>
      </div>
    </>
  );
};

export default Feedback;
