
        WITH {json} as data
        UNWIND data.treatment as row
        MATCH (treatment:treatment {accession: row.accession})
        WITH treatment, row
        MATCH (treatment_challenged_with_diet:diet {accession:row.challenged_with})
        MERGE (treatment)-[:challenged_with]->(treatment_challenged_with_diet)
        

        WITH {json} as data
        UNWIND data.litter as row
        MATCH (litter:litter {accession: row.accession})
        WITH litter, row
        MATCH (litter_part_of_bioproject:bioproject {accession:row.part_of})
        MERGE (litter)-[:part_of]->(litter_part_of_bioproject)
        
            WITH litter, row
            
        MATCH (litter_sire_mouse:mouse {accession:row.sire})
        MERGE (litter)-[:sire]->(litter_sire_mouse)
        
            WITH litter, row
            
        MATCH (litter_dam_mouse:mouse {accession:row.dam})
        MERGE (litter)-[:dam]->(litter_dam_mouse)
        
        WITH {json} as data
        UNWIND data.mouse as row
        MATCH (mouse:mouse {accession: row.accession})
        WITH mouse, row
        MATCH (mouse_born_to_litter:litter {accession:row.born_to})
        MERGE (mouse)-[:born_to]->(mouse_born_to_litter)
        
            WITH mouse, row
            
        MATCH (mouse_fed_diet:diet {accession:row.fed})
        MERGE (mouse)-[:fed]->(mouse_fed_diet)
        
            WITH mouse, row
            
        MATCH (mouse_undergoes_treatment:treatment {accession:row.undergoes})
        MERGE (mouse)-[:undergoes]->(mouse_undergoes_treatment)
        
            WITH mouse, row
            
        MATCH (mouse_part_of_bioproject:bioproject {accession:row.part_of})
        MERGE (mouse)-[:part_of]->(mouse_part_of_bioproject)


        WITH {json} as data
        UNWIND data.biosample as row
        MATCH (biosample:biosample {accession: row.accession})
        WITH biosample, row
        MATCH (biosample_derived_from_mouse:mouse {accession:row.derived_from})
        MERGE (biosample)-[:derived_from]->(biosample_derived_from_mouse)
        
            WITH biosample, row
            
        MATCH (biosample_pooled_from_biosample:biosample {accession:row.pooled_from})
        MERGE (biosample)-[:pooled_from]->(biosample_pooled_from_biosample)
        

        WITH {json} as data
        UNWIND data.assay as row
        MATCH (assay:assay {accession: row.accession})
        WITH assay, row
        MATCH (assay_recruits_reagent:reagent {accession:row.recruits})
        MERGE (assay)-[:recruits]->(assay_recruits_reagent)
        
            WITH assay, row
            
        MATCH (assay_assay_input_biosample:biosample {accession:row.assay_input})
        MERGE (assay)-[:assay_input]->(assay_assay_input_biosample)
        
            WITH assay, row
            
        MATCH (assay_pooled_from_assay:assay {accession:row.pooled_from})
        MERGE (assay)-[:pooled_from]->(assay_pooled_from_assay)
        

        WITH {json} as data
        UNWIND data.file as row
        MATCH (file:file {accession: row.accession})
        WITH file, row
        MATCH (file_paired_file_file:file {accession:row.paired_file})
        MERGE (file)-[:paired_file]->(file_paired_file_file)
        
            WITH file, row
            
        MATCH (file_sequenced_assay:assay {accession:row.sequenced})
        MERGE (file)-[:sequenced]->(file_sequenced_assay)