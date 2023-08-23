import PropTypes from 'prop-types'; // Asegúrate de importar PropTypes

const BrandH1 = ({ children }) => {
  return (
    <h1 className="font-barriecito text-4xl">{children}</h1>
  );
};

// Agrega la validación de PropTypes
BrandH1.propTypes = {
  children: PropTypes.node.isRequired, // Esto valida que se pase una propiedad "children"
};

export default BrandH1;
