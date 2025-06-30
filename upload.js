const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { createClient } = require("@supabase/supabase-js");

// ✅ Your Supabase credentials
const supabaseUrl = "https://wqbeoumfhmbaneoqcztl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxYmVvdW1maG1iYW5lb3FjenRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDMyNTYsImV4cCI6MjA2NjYxOTI1Nn0.SjhAFlN1va9z7LJulD2U94L8hjTCjlEPe0dL5pOWUrU";
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ CSV file path
const csvFilePath = path.join(__dirname, "faculty3.csv");

async function uploadOneByOne() {
  const rows = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      rows.push({
        sno: parseInt(row.sno),
        emp_id: row.emp_id,
        pfix: row.pfix,
        faculty_name: row.faculty_name,
        school: row.school,
        cabin_detail: row.cabin_detail,
      });
    })
    .on("end", async () => {
      console.log(`Read ${rows.length} rows. Uploading one by one...`);

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const { error } = await supabase.from("faculty_cabins").insert([row]);
        if (error) {
          console.error(`❌ Error inserting row ${i + 1}:`, error);
          break; // or continue if you want to skip errors
        } else {
          console.log(`✅ Inserted row ${i + 1}`);
        }
      }

      console.log("🎉 Upload complete.");
    });
}

uploadOneByOne();

