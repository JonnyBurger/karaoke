import {execSync} from 'child_process';

const music = 'public/music.mp3';

execSync(
	`whisper --language=English --model=small.en --word_timestamps True --output_format=json --output_format=json --output_dir=public ${music}`,
	{
		stdio: 'inherit',
	}
);
