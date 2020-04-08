const file = {
  one: "file",
  all: "files",

  prefix: "TRGTFF000",
  usr_prefix: 'USRFF000',
  connections: [{
      name: "paired_file",
      display_name: "Paired file",
      placeholder: "Link to File accession",
      to: "file",
      all: "files"
    },
    {
      name: "sequenced",
      display_name: "Assay",
      placeholder: "Assay sequenced in this file (link to Assay accession)",
      to: "assay",
      all: "assays",
      required: true
    }
  ]
};

module.exports = file;
