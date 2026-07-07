function processData(input) {
    return {};
}
function isProcessSuccess(arg) {
    return typeof arg === 'object' && arg !== null && 'status' in arg && arg.status === 'success';
}
