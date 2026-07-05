// 4)
const isArrowFunction = (func) => {
    if (typeof func !== 'function') {
        return false;
    }

    try {
        new func();
        return false;
    } 
    
    catch {
        return true;
    }
};