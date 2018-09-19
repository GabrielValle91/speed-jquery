module ShipmentsHelper
  def timeChanger(timefield)
    if !!timefield
      return timefield.strftime("%r")
    else
      return nil
    end
  end
end
