import PropTypes from 'prop-types';

const ControlType = ({ data }) => {
    return (
        <div className='flex justify-center gap-2'>
            {data.map((item, index) => (
                <div key={index} className='w-16 flex flex-col items-center'>
                    <img src={item.url} alt="" className='w-10' />
                    <strong className='text-sm'>{item.name}</strong>
                </div>
            ))}
        </div>
    );
};

ControlType.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired
};

export default ControlType;
