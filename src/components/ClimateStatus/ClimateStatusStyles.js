import { styled } from 'styled-components';

export const ClimateStatusContainer = styled.div`
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(45deg, #ffa809d1, #ffd700);
	display: flex;
	justify-content: center;
	align-items: center;

	h1, h3 {
		text-align: center;
	}	

	div {	
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	  gap: 10px;	  
	  color: #343434;		
	}

	form {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	  gap: 20px;
	}

	input {
	  width: 230px;
	  height: 40px;
	  border-radius: 5px;
	  border: none;
	  text-align: center;
	  font-size: 16px;
	}

	input:hover {
	  background-color: #eee;
	  transition: .2s;
	}
	
	button {
	  	width: 230px;
	  	height: 40px;
	  	border-radius: 5px;
	  	border: none;
	  	font-size: 16px;
		background-color: yellow;
		color: #524930;
		font-weight: bold;
		transition: .2s;
	}	

	button:hover {
		background-color: gold;
		transition: .2s;
	}

	fieldset {
	  padding: 20px;
	  outline: none;
	  border: 1px solid black;
	}
`;