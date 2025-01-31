export const API_KEY = 'AIzaSyBfuMmmx_X3-Xu5Gb1gJbEAT9ahKmJG6C4';
export const value_converter = (value)=>{
    if (value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if (value>=100000)
    {
        return Math.floor(value/100000)+"Lakh";
    }
    else if (value>=1000)
    {
        return Math.floor(value/1000)+"k";
    }
    else
    {
        return value;
    }

};
