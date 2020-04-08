const biosample = {
  one: "biosample",
  all: "biosamples",

  prefix: "TRGTSMP000",
  usr_prefix: 'USRSMP000',
  connections: [
    {
      name: "derived_from",
      display_name: "Mouse",
      placeholder: "Link to Mouse accession",
      to: "mouse",
      all: "mice",
      required: true
    },
    {
      name: "pooled_from",
      display_name: "Pooled from biosamples",
      placeholder: "Link to Biosample accessions (if applicable)",
      allow_multiple: true,
      to: "biosample",
      all: "biosamples"
    }
  ]
};

module.exports = biosample;
