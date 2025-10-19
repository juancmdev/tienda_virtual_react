const PaymentConfirmationPage = () => {
  return (
    <div className="container mx-auto p-20 text-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-green-600">
        ¡Gracias por tu compra! 🎉
      </h1>
      <p className="text-xl text-gray-700">
        Tu pedido ha sido procesado con éxito. Recibirás una confirmación por
        correo pronto.
      </p>
      {/* Opcional: podrías añadir un botón para volver a la tienda */}
    </div>
  );
};

export default PaymentConfirmationPage;
