fn run_production(factory_count:i32, dealer_count:i32) -> (f32,u32,Vec<u32>,Vec<u32>){
    
    let mut dealer_stats = vec![0;dealer_count];
    let mut factory_stats = vec![0;factory_count];

    let dealer_index = 0;
    for dealer in dealers{
        dealer_stats[dealer_index] = dealer.cars_rev;
        dealer_index += 1;
    }
    //run_time = log.stop_timer(f'{sum(dealer_stats)} cars have been created')

    let factory_index = 0;
    for factory in factories{
        factory_stats[factory_index] = factory.cars_to_produce;
        factory_index += 1;
    }
    
    return (
        run_time,
        car_queue.get_max_size(),
        dealer_stats,
        factory_stats
    );
}

fn main(){
   let runs = [(1,1),(1,2),(2,1),(2,2)];
   for (factories, dealerships) in runs{
        let production_return = run_production(factories, dealerships);
        let run_time = production_return.0;
        let max_queue_size = production_return.1;
        let dealer_stats = production_return.2;
        let factory_stats = production_return.3;

        println!("Factories         : {}", factories);
        println!("Dealerships       : {}", dealerships);
        println!("Run Time          : {}", run_time);
        println!("Max Queue Size    : {}", max_queue_size);
        println!("Factory Stats     : {:?}", dealer_stats);
        println!("Dealer Stats      : {:?}", factory_stats);
        println!("");

        // number of cars produced must equal number of cars sold
        assert!(
            dealer_stats.iter().sum::<u32>()==factory_stats.iter().sum::<u32>(),
            "sum of dealer_stats != sum of factory_stats"
        );
   }
}