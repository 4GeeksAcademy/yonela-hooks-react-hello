import React, { useState } from "react";

// Crear tu componente Home
const Home = () => {
	const [color, setColor] = useState('red'); // Color inicial es rojo
	const [extraColor, setExtraColor] = useState(false);
	const [isHovering, setIsHovering] = useState({ toggle: false, addPurple: false });

	// Alternar entre los colores en el orden deseado
	const toggleColor = () => {
		if (color === 'red') setColor('yellow');
		else if (color === 'yellow') setColor('green');
		else if (color === 'green') setColor(extraColor ? 'purple' : 'red');
		else if (color === 'purple') setColor('red');
	};

	// Añadir el color púrpura y expandir el contenedor
	const addPurpleColor = () => {
		setExtraColor(true);
		setColor('purple');
	};

	// Función para aplicar el estilo de brillo a la luz activa
	const getLightStyle = (lightColor) => ({
		backgroundColor: color === lightColor ? lightColor : getDimmedColor(lightColor),
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		margin: '10px auto',
		cursor: 'pointer',
		opacity: color === lightColor ? 1 : 0.5, // Ajustar la opacidad para simular apagado
		boxShadow: color === lightColor ? `0 0 15px ${lightColor}` : 'none',  // Añadir sombra al color activo
		transition: 'background-color 0.3s, box-shadow 0.3s' // Suavizar la transición de color y sombra
	});

	// Función para obtener el color atenuado
	const getDimmedColor = (color) => {
		switch (color) {
			case 'red':
				return 'darkred';
			case 'yellow':
				return 'goldenrod';
			case 'green':
				return 'darkgreen';
			case 'purple':
				return 'indigo';
			default:
				return 'gray';
		}
	};

	// Estilo para los botones
	const buttonStyle = {
		backgroundColor: 'purple',
		color: 'white',
		padding: '10px 20px',
		margin: '10px',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		fontSize: '16px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
		transition: 'background-color 0.3s, transform 0.2s',
		transform: isHovering.toggle ? 'scale(1.05)' : 'scale(1)', // Escala al pasar el mouse
	};

	const addPurpleButtonStyle = {
		...buttonStyle,
		transform: isHovering.addPurple ? 'scale(1.05)' : 'scale(1)', // Escala al pasar el mouse
	};

	return (
		<div className="text-center">
			<div style={{
				width: '80px',
				height: extraColor ? '230px' : '180px',  // Ajustar la altura si el color púrpura está activo
				backgroundColor: 'black',
				padding: '10px',
				borderRadius: '10px',
				margin: '20px auto'
			}}>
				<div
					onClick={() => setColor('red')}
					style={getLightStyle('red')}
				/>
				<div
					onClick={() => setColor('yellow')}
					style={getLightStyle('yellow')}
				/>
				<div
					onClick={() => setColor('green')}
					style={getLightStyle('green')}
				/>
				{extraColor && (
					<div
						onClick={() => setColor('purple')}
						style={getLightStyle('purple')}
					/>
				)}
			</div>
			<button
				onClick={toggleColor}
				style={buttonStyle}
				onMouseEnter={() => setIsHovering({ ...isHovering, toggle: true })}
				onMouseLeave={() => setIsHovering({ ...isHovering, toggle: false })}
			>
				Alternar Color
			</button>
			<button
				onClick={addPurpleColor}
				style={addPurpleButtonStyle}
				onMouseEnter={() => setIsHovering({ ...isHovering, addPurple: true })}
				onMouseLeave={() => setIsHovering({ ...isHovering, addPurple: false })}
			>
				Añadir Color Púrpura
			</button>
		</div>
	);
};

export default Home;
