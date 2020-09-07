import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const contentDir = path.join(process.cwd(), 'content')

  const filePath = path.join(contentDir, `bg.json`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(fileContents);

  const pick = Math.floor(Math.random() * json.images.length)
  res.redirect(json.images[pick]);
}
