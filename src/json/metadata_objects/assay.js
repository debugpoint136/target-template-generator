const donor_object = {
  one: "assay",
  all: "assays",

  prefix: "TRGTASY000",
  usr_prefix: 'USRASY000',
  connections: [
    {
      name: "recruits",
      display_name: "Reagent",
      placeholder: "Link to Reagent accession (if applicable)",
      allow_multiple: true,
      to: "reagent",
      all: "reagents"
    },
    {
      name: "assay_input",
      display_name: "Biosample",
      placeholder: "Cell population on which assay was performed (if applicable); link to Biosample accession",
      to: "biosample",
      all: "biosamples",
      required: true
    },
    {
      name: "pooled_from",
      display_name: "Pooled from assays",
      placeholder: "Link to Assay accessions (if applicable)",
      allow_multiple: true,
      to: "assay",
      all: "assays"
    }
  ]
};

module.exports = donor_object;
