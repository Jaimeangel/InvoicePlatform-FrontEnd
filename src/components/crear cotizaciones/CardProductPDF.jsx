import { View,Text } from '@react-pdf/renderer';
import { formatoMonedaDosDecimales } from '../../helpers/formatoMonedas';

function CardProductoPDF({data,index}) {
    const {
        item,
        descripcion,
        cantidad,
        precioUnitario,
        impuesto,
        total
    }=data;

    const formatNumber=(value)=>{
        const numberFormat = formatoMonedaDosDecimales(value);
        return numberFormat
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '13px'
            }}
            wrap={false}
        >
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:'center',
                    border: '1px solid black',
                    borderRadius: '2px',
                    backgroundColor: 'white',
                }}
            >
                <Text
                    style={{
                        width:`6%`,
                        borderRight: '1px solid black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        paddingTop: '2px',
                        paddingBottom: '2px'
                    }} 
                >
                    {index+1}
                </Text>
                <View
                    style={{
                        width:`35%`,
                        borderRight: '1px solid black'
                    }} 
                >
                    <Text
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            outline: 'none',
                            paddingLeft: '3px',
                            paddingRight: '3px',
                            paddingTop: '2px',
                            paddingBottom: '2px',
                            fontWeight: 'bold',
                            textAlign: 'justify',
                        }}
                    >
                        {descripcion}
                    </Text>
                </View>
                <Text
                    style={{
                        width:`19%`,
                        borderRight: '1px solid black',
                        fontWeight: 'bold',
                        outline: 'none',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        paddingTop: '2px',
                        paddingBottom: '2px'
                    }} 
                >
                    {formatNumber(precioUnitario)}
                </Text>
                <Text
                    style={{
                        width:`9%`,
                        borderRight: '1px solid black',
                        fontWeight: 'bold',
                        outline: 'none',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        paddingTop: '2px',
                        paddingBottom: '2px'
                    }} 
                >
                    {cantidad}
                </Text>
                <Text
                    style={{
                        width:`12%`,
                        textAlign: 'center',
                        borderRight: '1px solid black',
                        outline: 'none',
                        fontWeight: 'bold',
                        paddingTop: '2px',
                        paddingBottom: '2px'
                    }} 
                >
                    {`${impuesto} %`}
                </Text>
                <Text
                    style={{
                        width:`19%`,
                        backgroundColor: 'white',
                        textAlign: 'center',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        paddingTop: '2px',
                        paddingBottom: '2px'
                    }}  
                >
                    {formatNumber(total)}
                </Text>
            </View>
        </View>
    )
}

export default CardProductoPDF;