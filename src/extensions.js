window.customLocalStorage=
{
    getItem(key)
    {
        // getting the data from localStorage using the key
        let result=JSON.parse(window.localStorage.getItem(key));

        if(result)
        {
            /*
                if data expireTime is less then current time
                means item has expired,
                in this case removing the item using the key
                and return the null.
            */
            if(result.expireTime<=Date.now())
            {
                window.localStorage.removeItem(key);
                return null;
            }
            // else return the data.
            return result.data;
        }
        //if there is no data provided the key, return null.
        return null;
    },

    /*
        accepting the key, value and expiry time as a parameter
        default expiry time is 30 days in milliseconds.
    */
    setItem(key, value, maxAge=30*30*60*1000)
    {
        // Storing the value in object.
        let result=
        {
            data:value
        }

        if(maxAge)
        {
            /*
                setting the expireTime currentTime + expiry Time 
                provided when method was called.
            */
            result.expireTime=Date.now()+maxAge;
        }
        window.localStorage.setItem(key,JSON.stringify(result));
    },
    removeItem(key)
    {
        window.localStorage.removeItem(key);
    },
    clear()
    {
        window.localStorage.clear();
    }
}
