class EnemyGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        scene.add.existing(this);

        this.createMultiple({
            frameQuantity: 0,
            key: 'enemy',
            active: false,
            visible: false,
            classType: Enemy
        });

    }

    update(){
    }

    reset() {
    }

    spawnEnemy()
    {
        let enemy = this.create(new Enemy(this.scene, game.config.width - 10, borderUISize*10.5));

        if (enemy)
        {
            enemy.spawn();
        }
    }
}
