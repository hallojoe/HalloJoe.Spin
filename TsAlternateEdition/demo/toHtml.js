/**
 * Convert pre formated text to simple html
 */
String.prototype.toHtml = function () {
    var s = this;
    s = s.replace(/\n/g, '</p><p>');
    s = '<p>' + s + '</p>';
    s = s.replace('<p></p>', '');
    //this = s;
    return s;
}