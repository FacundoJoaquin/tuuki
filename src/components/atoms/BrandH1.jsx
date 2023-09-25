import PropTypes from 'prop-types'; 

const BrandH1 = ({ children }) => {
  return (
    <h1 className="font-barriecito text-4xl">{children}</h1>
  );
};

BrandH1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BrandH1;
