const litter = {
  one: "litter",
  all: "litters",

  prefix: "TRGTLTR000",
  usr_prefix: 'USRLTR000',
  connections: [
    {
      name: "part_of",
      display_name: "Bioproject",
      placeholder: "Link to Bioproject accession",
      allow_multiple: true,
      to: "bioproject",
      all: "bioprojects"
    },
    {
      name: "sire",
      display_name: "Sire",
      placeholder: "Link to Mouse accession",
      to: "mouse",
      all: "mice"
    },
    {
      name: "dam",
      display_name: "Dam",
      placeholder: "Link to Mouse accession",
      to: "mouse",
      all: "mice"
    },
  ]
};

module.exports = litter;
