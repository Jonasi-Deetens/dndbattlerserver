// seed_all.js
import { exec } from 'child_process';

exec('node language_seed.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error seeding languages: ${stderr}`);
    process.exit(1);
  }
  console.log(`Languages seeded: ${stdout}`);
  exec('node skill_seed.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error seeding skills: ${stderr}`);
      process.exit(1);
    }
    console.log(`Skills seeded: ${stdout}`);

    exec('node senses_seed.js', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error seeding senses: ${stderr}`);
        process.exit(1);
      }
      console.log(`Senses seeded: ${stdout}`);

      exec('node spell_seed.js', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error seeding spells: ${stderr}`);
          process.exit(1);
        }
        console.log(`Spells seeded: ${stdout}`);

        exec('node race_seed.js', (err, stdout, stderr) => {
          if (err) {
            console.error(`Error seeding races: ${stderr}`);
            process.exit(1);
          }
          console.log(`Races seeded: ${stdout}`);

          exec('node class_seed.js', (err, stdout, stderr) => {
            if (err) {
              console.error(`Error seeding classes: ${stderr}`);
              process.exit(1);
            }
            console.log(`Classes seeded: ${stdout}`);

            exec('node organization_seed.js', (err, stdout, stderr) => {
              if (err) {
                console.error(`Error seeding organizations: ${stderr}`);
                process.exit(1);
              }
              console.log(`Organizations seeded: ${stdout}`);

              exec('node item_seed.js', (err, stdout, stderr) => {
                if (err) {
                  console.error(`Error seeding items: ${stderr}`);
                  process.exit(1);
                }
                console.log(`Items seeded: ${stdout}`);

                exec('node obstacle_seed.js', (err, stdout, stderr) => {
                  if (err) {
                    console.error(`Error seeding obstacles: ${stderr}`);
                    process.exit(1);
                  }
                  console.log(`Obstacles seeded: ${stdout}`);

                  exec('node ability_seed.js', (err, stdout, stderr) => {
                    if (err) {
                      console.error(`Error seeding abilities: ${stderr}`);
                      process.exit(1);
                    }
                    console.log(`Abilities seeded: ${stdout}`);

                    exec('node campaign_seed.js', (err, stdout, stderr) => {
                      if (err) {
                        console.error(`Error seeding campaign: ${stderr}`);
                        process.exit(1);
                      }
                      console.log(`Campaign seeded: ${stdout}`);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
