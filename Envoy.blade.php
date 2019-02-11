@setup
$pathOnPi = '/home/pi/raspberrypi-temperature-reporter';
@endsetup

@servers(['pi' => 'pi@pi', 'localhost' => '127.0.0.1'])

@task('display start message', ['on' => 'localhost'])
echo 'start deploying on Raspberry Pi. Path: {{ $pathOnPi }}'
@endtask

@task('checkout master branch', ['on' => 'pi'])
cd '{{ $pathOnPi }}'
echo 'checking out the master branch'
git checkout master
@endtask

@task('pull changes on server', ['on' => 'pi'])
cd '{{ $pathOnPi }}'
git pull origin master
@endtask

@task('run yarn', ['on' => 'pi'])
echo 'running yarn'
cd '{{ $pathOnPi }}'
yarn config set ignore-engines true
yarn
@endtask

@task('restart supervisor', ['on' => 'pi'])
sudo supervisorctl restart all
@endtask

@task('display success message', ['on' => 'localhost'])
echo "application successfully deployed"
@endtask

@macro('deploy')
display start message
checkout master branch
pull changes on server
run yarn
restart supervisor
display success message
@endmacro
