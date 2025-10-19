import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  //--------------------------------------------------------------------
  //Función para el loading
  //--------------------------------------------------------------------

  return (
    <div className="container mx-auto p-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-600">
        ¡Gracias por tu compra! 🎉
      </h1>
      <p className="text-xl text-gray-700">
        Tu pedido ha sido procesado con éxito. Recibirás una confirmación por
        correo pronto.
      </p>
      {/* Opcional: podrías añadir un botón para volver a la tienda */}
      <button
        onClick={() => navigate("/productos")}
        className="bg-orange-500 hover:bg-orange-600 transition duration-150 py-2 px-4 rounded mt-6 text-white cursor-pointer font-bold"
      >
        Volver a la tienda
      </button>
    </div>
  );
};

export default PaymentConfirmationPage;
