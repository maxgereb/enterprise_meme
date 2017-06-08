var createThumb = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream);
};

var createMedium = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('800', '800').stream().pipe(writeStream);
};

export default Images = new FS.Collection("Memes", {
  stores: [
    new FS.Store.GridFS("memes")
    //new FS.Store.GridFS("medium", {transformWrite: createMedium})
  ]
});
